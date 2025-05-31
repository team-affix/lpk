#ifndef UNIT_TEST

#include <stdio.h>
#include <iostream>
#include <string.h>
#include "../CLI11/include/CLI/CLI.hpp"
#include <filesystem>

#define LPK_NAME "lpk"

#define LPK_DEPS_FILE "deps.txt"

int main(int argc, char **argv)
{

#if 0

    // std::vector<std::string> l_input =
    //     {
    //         "uni",
    //         "--help",
    //     };
    std::vector<std::string> l_input =
        {
            LPK_NAME,
            "install",
        };
    argc = l_input.size();
    std::vector<char *> l_input_converted;
    for (int i = 0; i < l_input.size(); i++)
    {
        l_input_converted.push_back(l_input[i].data());
    }
    argv = l_input_converted.data();
    // ------------------------------------------------

#endif

    std::cout << "PWD: " << std::filesystem::current_path() << std::endl;

    CLI::App l_app("Logic package manager", LPK_NAME);
    l_app.require_subcommand(1);


    //////////////////////////////////////////////////////////////
    // Install command ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    CLI::App* l_subcommand_install = l_app.add_subcommand("install", std::string("Installs packages into into the parent directory."));

    std::vector<std::string> l_package_names;
    l_subcommand_install->add_option("package_names", l_package_names, "List of package names");

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    
    //////////////////////////////////////////////////////////////
    // Validate command ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    CLI::App* l_subcommand_validate = l_app.add_subcommand("validate", std::string("Validates current environment with the agda input being this package's main module."));

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////



    // CLI::App l_app("Unilog proof verifier", argv[0]);
    // // l_app.require_subcommand(1);

    // std::vector<std::string> l_files;
    // l_app.add_option("files", l_files, "List of input files");

    // PARSE ACTUAL DATA
    try
    {
        l_app.parse(argc, argv);
        std::copy(l_package_names.begin(), l_package_names.end(), std::ostream_iterator<std::string>(std::cout, "\n"));
    }
	catch (const CLI::ParseError& e) {
		return l_app.exit(e);
	}
    catch (const std::exception &e)
    {
        std::cout << e.what() << std::endl;
        return 1;
    }

    return 0;
}

#endif
